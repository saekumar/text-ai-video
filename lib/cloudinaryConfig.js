import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: 'dwp75ziq4',
      api_key: '366732429834142',
      api_secret: 'uoaBq6RGE5HM-sYjRnVp597C1CI',
      timeout: 60000,
    })
    console.log('Cloudinary configuration successful')
  } catch (error) {
    console.log(`error at cloudinary : ${error.message}`)
  }
}

export const uploadImageToCloudinary = async (imageUrl) => {
  await cloudinaryConfig()
  try {
    const response = await cloudinary.uploader.upload(imageUrl, {
      folder: 'fal-images',
    })
    console.log('Uploaded image:', response.secure_url)
    return response.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

export const uploadAudioToCloudinary = async (audioUrl) => {
  await cloudinaryConfig()
  try {
    const response = await cloudinary.uploader.upload(audioUrl, {
      resource_type: 'video',
      folder: 'audio-files',
    })

    console.log('Uploaded audio:', response.secure_url)
    return response.secure_url
  } catch (error) {
    console.error('Error uploading audio to Cloudinary:', error)
    throw error
  }
}

export const uploadVideoToCloudinary = async (videoUrl) => {
  await cloudinaryConfig()
  try {
    let res = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      folder: 'fal-videos',
    })
    console.log('Uploaded video:', res.secure_url)
    return res.secure_url
  } catch (error) {
    console.log('Error uploading video to Cloudinary:', error)
    throw error
  }
}
