const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // deleteThought(req, res) {
  //   console.log("req.params::: ", req.params);
  //   //first get userdata based on userID
  //   // we will get thoughts
  //   // filter based on thoughtid 
  //   // except that id => rem thoughts
  //   // 
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: 'No user with this id! or No though with that id' });
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        console.log("dbThoughtData ::: ", dbThoughtData);
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        // remove thought id from user's `thoughts` field
        try {
          const updatedUserData = User.findOneAndUpdate(
            { _id: req.body.userId, thoughts:req.params.thoughtId},
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
          // if(!updatedUserData) {
          //   return res.status(404).josn({message:"thought id deleted but no user with that is"})
          // }
          // return res.status(404).josn({message:"thought id deleted but no user with that is"})

          console.log("updatedUserData ::: ", updatedUserData);
        } catch (err) {
          console.log("user tought delete err ::: ", err);
        }

        // return updatedUserData;
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
