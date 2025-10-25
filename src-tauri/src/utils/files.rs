use std::path::PathBuf;
use std::fs::{self,File};
use tauri::{image::Image};
use crate::constants::clipboard_key::FILE_PATH;
use crate::utils::data::get_data_now;
use image::codecs::png::PngEncoder;
use image::{ExtendedColorType, ImageEncoder};
use std::io::BufWriter;


pub fn save_image(image: &Image<'_>) -> String {
  
  let date_now=get_data_now().to_string();

  let file_name=format!("image_{}.png", date_now);

  let file_path=format!("{}/images/{}", FILE_PATH, file_name);

  let path= PathBuf::from(&file_path);


   if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).expect("not able to create directory");
    }

  let rgba=image.rgba();
  let width=image.width();
  let height=image.height();

  let file= File::create(&path).expect("Unable to save image");

  let writer= BufWriter::new(file);
  
  let encoder= PngEncoder::new(writer);

  encoder.write_image(
    rgba,
    width,
    height,
    ExtendedColorType::Rgba8
  ).expect("Failed to encode image");

  file_name

  
}



pub fn delete_image(file_name: String) {
    std::thread::spawn(move || {
        let file_path = format!("{}/images/{}", FILE_PATH, file_name);
        let path = PathBuf::from(file_path);

        if path.exists() {
            fs::remove_file(path)?;
            Ok(())
        } else {
            Err(std::io::Error::new(std::io::ErrorKind::NotFound, "file not found"))
        }
    });
}

pub fn delete_all_images() {
  std::thread::spawn(move || {
    let images_path = format!("{}/images", FILE_PATH);
    let path = PathBuf::from(images_path);

    if path.exists() {
        if let Err(e) = fs::remove_dir_all(path) {
            eprintln!("Error deleting all images: {}", e);
        }
    }
    });
}
