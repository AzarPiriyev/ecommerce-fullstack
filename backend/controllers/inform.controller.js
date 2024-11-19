import Inform from '../models/inform.model.js';


export const createInform = async (req, res) => {
  const { title, description, content, code } = req.body;

  try {
    const newInform = await Inform.create({ title, description, content, code });
    res.status(201).json(newInform);
  } catch (error) {
    res.status(400).json({ error: 'Error creating inform: ' + error.message });
  }
};


export const getAllInforms = async (req, res) => {
  try {
    const informs = await Inform.find();
    res.status(200).json(informs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching informs: ' + error.message });
  }
};


export const getInformById = async (req, res) => {
  try {
    const inform = await Inform.findById(req.params.id);
    if (!inform) {
      return res.status(404).json({ error: 'Inform not found' });
    }
    res.status(200).json(inform);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inform: ' + error.message });
  }
};


export const updateInform = async (req, res) => {
  try {
    const updatedInform = await Inform.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInform) {
      return res.status(404).json({ error: 'Inform not found' });
    }
    res.status(200).json(updatedInform);
  } catch (error) {
    res.status(400).json({ error: 'Error updating inform: ' + error.message });
  }
};


export const deleteInform = async (req, res) => {
  try {
    const deletedInform = await Inform.findByIdAndDelete(req.params.id);
    if (!deletedInform) {
      return res.status(404).json({ error: 'Inform not found' });
    }
    res.status(200).json({ message: 'Inform deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting inform: ' + error.message });
  }
};
