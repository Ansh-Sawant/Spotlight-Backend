import Bookmarks from "../modal/bookmarks.js";

export const getBookmarks = async (req, res) => {
  try {
    let data = await Bookmarks.find({});

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
