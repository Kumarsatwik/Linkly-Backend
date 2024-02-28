import express from "express";
import { urlModel } from "../model/shortUrl.model";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl: fullUrl });
    if (urlFound.length > 0) {
      return res.status(409).json(urlFound);
    }
    const url = await urlModel.create({ fullUrl });

    return res.status(201).json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const url = await urlModel.find().sort({ createdAt: -1 });
    if (url.length == 0) {
      return res.status(200).json({ message: "No url found" });
    }
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const url = await urlModel.findOne({ shortUrl: id });
    if (!url) {
      return res.status(404).json({ message: "Url not found" });
    }
    url.clicks++;
    url.save();
    // return res.status(200).json(url);
    res.redirect(url.fullUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const url = await urlModel.findByIdAndDelete(id);
    if (url) {
      return res.status(200).json({ message: "Url deleted successfully" });
    }
    return res.status(404).json({ message: "Url not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
