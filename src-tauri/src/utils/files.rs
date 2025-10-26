use crate::utils::data::get_data_now;
use image::codecs::png::PngEncoder;
use image::{ExtendedColorType, ImageEncoder,ImageBuffer,Rgba};
use std::fs::{self, File};
use std::io::BufWriter;
use std::path::{ PathBuf};
use tauri::image::Image;
use crate::utils::path::get_local_data_path;
use image::imageops::{self,FilterType};



pub fn save_thumbnail(image: &Image<'_>)->String{
     let local_data= get_local_data_path().unwrap();

    print!("local data path: {}",local_data);

    let date_now = get_data_now().to_string();

    let file_name = format!("image_{}", date_now);

    let rgba = image.rgba();
    let width = image.width();
    let height = image.height();

    //thumbail  
    let thumbail_file_name = format!("thumb_image_{}.bmp", date_now);
    let thumbail_file_path = format!("{}/images/thumbs/{}", local_data, thumbail_file_name);
    let thumbail_path = PathBuf::from(&thumbail_file_path);

    if let Some(parent) = thumbail_path.parent() {
        fs::create_dir_all(parent).expect("not able to create directory");
    }

    let thumb_buffer = ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(width, height, rgba.to_vec())
        .expect("Failed to create ImageBuffer from raw data");

    let (new_width, new_height) = if width > 300 {
        let ratio = height as f32 / width as f32;
        (300, (300.0 * ratio) as u32)
    } else {
        (width, height)
    };


    let thumb=imageops::resize(&thumb_buffer, new_width, new_height, FilterType::Nearest);

    thumb.save(&thumbail_path).expect("Failed to save thumbail");


    file_name
    
}


pub fn save_image(image: &Image<'_>,file_name: String)  {

    let local_data= get_local_data_path().unwrap();



    let file_path = format!("{}/images/{}.png", local_data, file_name);

    let path = PathBuf::from(&file_path);

    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).expect("not able to create directory");
    }

    let rgba = image.rgba();
    let width = image.width();
    let height = image.height();

    let file = File::create(&path).expect("Unable to save image");

    let writer = BufWriter::new(file);

    let encoder = PngEncoder::new_with_quality(
        writer, 
        image::codecs::png::CompressionType::Fast,
        image::codecs::png::FilterType::Sub,
        );

    encoder
        .write_image(rgba, width, height, ExtendedColorType::Rgba8)
        .expect("Failed to encode image");

}




pub fn delete_image(file_name: String) {
    std::thread::spawn(move || {

        let local_data= get_local_data_path().unwrap();

        let file_path = format!("{}/images/{}.png", local_data, file_name);
        
        let file_thumb_path = format!("{}/images/thumbs/thumb_{}.bmp", local_data, file_name);

        let path = PathBuf::from(file_path);

        let path_thumb = PathBuf::from(file_thumb_path);

        if path.exists() {
            if let Err(e) = fs::remove_file(path) {
                eprintln!("Error deleting file: {}", e);
            }
        } else {
            eprintln!("File not found: {}", file_name);
        }

        if path_thumb.exists() {
            if let Err(e) = fs::remove_file(path_thumb) {
                eprintln!("Error deleting thumbnail: {}", e);
            }
        } else {
            eprintln!("Thumbnail not found: {}", file_name);
        }
    });
}

pub fn delete_all_images() {
    std::thread::spawn(move || {
        let local_data= get_local_data_path().unwrap();

        let images_path = format!("{}/images", local_data);

        let path = PathBuf::from(images_path);

        if path.exists() {
            if let Err(e) = fs::remove_dir_all(path) {
                eprintln!("Error deleting all images: {}", e);
            }
        }
    });
}
