const { Conversation, Participant } = require('../models');

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      include: {
        model: Participant,
        as: 'participants'
      }
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createConversation = async (req, res) => {
  const { title, is_group, status, participants  } = req.body;
  try {
    const conversation = await Conversation.create({ title, is_group, status });
    if (participants && participants.length > 0) {
      const participantPromises = participants.map(participant => 
        Participant.create({ conversation_id: conversation.id, user_id: participant.user_id })
      );
      await Promise.all(participantPromises);
    }
    res.status(201).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getConversationById = async (req, res) => {
  const { id } = req.params;
  try {
    const conversations = await Conversation.findByPk(id, {
      include: {
        model: Participant,
        as: 'participants'
      }
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.softDeleteConversation = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findByPk(id);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    await conversation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateConversation = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const conversation = await Conversation.findByPk(id);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    if (title) {
      conversation.title = title;
    }

    if (status) {
      conversation.status = status;
    }
    await conversation.save();
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
