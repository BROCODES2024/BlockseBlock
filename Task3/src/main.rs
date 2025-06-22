use printpdf::*;
use std::fs::File;
use std::io;

fn calculate_average(total_marks: f64, num_subjects: usize) -> f64 {
    total_marks / num_subjects as f64
}

fn assign_grade(average: f64) -> char {
    if average >= 90.0 {
        'A'
    } else if average >= 75.0 {
        'B'
    } else if average >= 60.0 {
        'C'
    } else {
        'D'
    }
}

fn main() {
    // Input
    let mut name = String::new();
    println!("Enter student name:");
    io::stdin()
        .read_line(&mut name)
        .expect("Failed to read input");
    let name = name.trim().to_string();

    let mut total_marks_input = String::new();
    println!("Enter total marks obtained:");
    io::stdin()
        .read_line(&mut total_marks_input)
        .expect("Failed to read input");
    let total_marks: f64 = total_marks_input
        .trim()
        .parse()
        .expect("Please enter a number");

    let mut num_subjects_input = String::new();
    println!("Enter number of subjects:");
    io::stdin()
        .read_line(&mut num_subjects_input)
        .expect("Failed to read input");
    let num_subjects: usize = num_subjects_input
        .trim()
        .parse()
        .expect("Please enter a number");

    let average = calculate_average(total_marks, num_subjects);
    let grade = assign_grade(average);

    println!("\nReport Card:");
    println!("Name: {}", name);
    println!("Total Marks: {}", total_marks);
    println!("Number of Subjects: {}", num_subjects);
    println!("Average: {:.2}", average);
    println!("Grade: {}", grade);

    // Create PDF
    create_pdf(&name, total_marks, num_subjects, average, grade);

    println!("\nReport card saved as 'report_card.pdf'");
}

fn create_pdf(name: &str, total_marks: f64, num_subjects: usize, average: f64, grade: char) {
    use std::io::BufWriter;

    let (doc, page1, layer1) =
        PdfDocument::new("Student Report Card", Mm(210.0), Mm(297.0), "Layer 1");
    let current_layer = doc.get_page(page1).get_layer(layer1);

    let text = format!(
        "Report Card\n\nName: {}\nTotal Marks: {}\nNumber of Subjects: {}\nAverage: {:.2}\nGrade: {}",
        name, total_marks, num_subjects, average, grade
    );

    let font = doc
        .add_external_font(File::open("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf").unwrap())
        .unwrap();

    current_layer.use_text(text, 12.0, Mm(20.0), Mm(270.0), &font);

    let file = File::create("report_card.pdf").unwrap();
    let mut buf_writer = BufWriter::new(file);
    doc.save(&mut buf_writer).unwrap();
}
