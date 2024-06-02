const { Conversation, Message } = require('../models');
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const uploadSetting = require('../utils/file_upload_settings');
const fileUploader = require('../utils/file_uploader');


exports.createMessage = async (req, res) => {
  console.log('req', req.body);
  try {
    let chatMedia = await fileUploader.uploadMiddleware(req, uploadSetting.multipleFileUploadSetting);
		if (chatMedia instanceof Error) {
			res.send({ status: 400, message: 'Failed to upload event images' })
			return
		}
    const { sender_id, conversation_id, reply_of } = req.body;
    const files = chatMedia;
    if(files && files.length > 0) {
      const fileDetails = files.map(file => {
        let fileType = 'doc';
        if(file.mime_type === 'application' || file.mime_type === 'xlsx' || file.mime_type === 'csv' || file.mime_type === 'doc'){
          fileType = 'document';
        } else if(file.mime_type === 'video' || file.mime_type === 'webm' || file.mime_type === 'mkv' || file.mime_type === 'avi'){
          fileType = 'video';
        } else if(file.mime_type === 'png' || file.mime_type === 'jpg' || file.mime_type === 'jpeg' || file.mime_type === 'gif' || file.mime_type === 'svg' || file.mime_type === 'webp', file.mime_type === 'image'){
          fileType = 'image';
        } else if(file.mime_type === 'mp3' || file.mime_type === 'wav' || file.mime_type === 'wma' || file.mime_type === 'aac' || file.mime_type === 'm4a' || file.mime_type === 'audio'){
          fileType = 'audio';
        } else {
          fileType = 'document';
        }

        return {
          path: file.url,
          type: fileType
        };
      })
      if (files.length === 1) {
        content = files[0].url;
        type = fileDetails[0].type;
      } else {
        
        content = JSON.stringify(fileDetails.map(file => file.path));
        type = 'multiple'; 
      }
    } else {
      content = req.body.content;
      type = 'text';
    }
    console.log('content', content);
    const message = await Message.create({ sender_id, conversation_id, content, type, reply_of: reply_of || null });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessagesByConversationId = async (req, res) => {
  console.log('getMessagesByConversationId', req.params);
  const { id } = req.params;
  try {
    const messages = await Message.findAll({
      where: { conversation_id: id },
      include: [
        {
          model: Message,
          as: 'Replies',
          include: {
            model: Conversation,
            as: 'Conversation'
          }
        }
      ]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    let chatMedia = await fileUploader.uploadMiddleware(req, uploadSetting.multipleFileUploadSetting);
		if (chatMedia instanceof Error) {
			res.send({ status: 400, message: 'Failed to upload event images' })
			return
		}

    // const { conversation_id } = req.body;
    const files = chatMedia;
    if(files && files.length > 0) {
      const fileDetails = files.map(file => {
        console.log(file);
        let fileType = 'doc';
        if(file.mime_type === 'application' || file.mime_type === 'xlsx' || file.mime_type === 'csv' || file.mime_type === 'doc'){
          fileType = 'document';
        } else if(file.mime_type === 'video' || file.mime_type === 'webm' || file.mime_type === 'mkv' || file.mime_type === 'avi'){
          fileType = 'video';
        } else if(file.mime_type === 'png' || file.mime_type === 'jpg' || file.mime_type === 'jpeg' || file.mime_type === 'gif' || file.mime_type === 'svg' || file.mime_type === 'webp', file.mime_type === 'image'){
          fileType = 'image';
        } else if(file.mime_type === 'mp3' || file.mime_type === 'wav' || file.mime_type === 'wma' || file.mime_type === 'aac' || file.mime_type === 'm4a' || file.mime_type === 'audio'){
          fileType = 'audio';
        } else {
          fileType = 'document';
        }

        return {
          path: file.url,
          type: fileType
        };
      })
      if (files.length === 1) {
        content = files[0].url;
        type = fileDetails[0].type;
      } else {
        
        content = JSON.stringify(fileDetails.map(file => file.path));
        type = 'multiple'; 
      }
    } else {
      content = req.body.content;
      type = 'text';
    }

    await message.update({ content, type });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.softDeleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await message.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
