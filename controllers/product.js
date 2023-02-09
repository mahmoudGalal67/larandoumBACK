import { db } from "../DB.js";

export const addProduct = async (req, res) => {
  const qp =
    "INSERT INTO products(`title`,`desc` ,`price`,`type` , `category`,`image`) VALUES (?)";

  const productValues = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.type,
    req.body.category,
    req.body.image,
  ];

  db.query(qp, [productValues], (err, dataP) => {
    if (err) return res.status(500).json(err);
    res.json(dataP.insertId);
  });
};

export const addGiftAndFragrance = async (req, res) => {
  const qp =
    "INSERT INTO gifts(`title`,`desc` ,`price`, `category`,`image`) VALUES (?)";

  const giftValues = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.category,
    req.body.image,
  ];

  db.query(qp, [giftValues], (err, dataP) => {
    if (err) return res.status(500).json(err);
    res.json(dataP.insertId);
  });
};

export const addProductcolors = (req, res) => {
  const qc = "INSERT INTO colors(`productId`,`color`) VALUES (?)";

  db.query(qc, [[req.body.productId, req.body.color]], (err, dataS) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("ok");
  });
};

export const addProductimages = (req, res) => {
  const qc = "INSERT INTO images(`productId`,`image`) VALUES (?)";

  db.query(qc, [[req.body.productId, req.body.image]], (err, dataS) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("ok");
  });
};

export const addProductsizes = (req, res) => {
  const qc = "INSERT INTO sizes(`productId`,`size`) VALUES (?)";

  db.query(qc, [[req.body.productId, req.body.size]], (err, dataS) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("ok");
  });
};

export const productType = async (req, res) => {
  const { type } = req.query;
  let q;
  if (type === "gifts") {
    q = "SELECT * FROM gifts WHERE type = ?";
  } else if (type === "new") {
    q = "SELECT * FROM products ORDER BY id DESC LIMIT 12";
  } else {
    q = "SELECT * FROM products WHERE type = ?";
  }
  db.query(q, [type], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

export const productCategory = async (req, res) => {
  const { type, category } = req.query;
  let q;
  if (type === "gifts") {
    q = "SELECT * FROM gifts WHERE type = ? AND category = ?";
  } else {
    q = "SELECT * FROM products WHERE type = ? AND category = ?";
  }
  db.query(q, [type, category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data[0]);
  });
};

export const getGift = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM gifts WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data[0]);
  });
};

export const productColors = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM colors WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

export const productImages = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM images WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

export const productSizes = async (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM sizes WHERE productId = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.send(data);
  });
};

export const deleteProduct = async (req, res) => {
  let q;
  if (req.query.type === "gifts") {
    q = "DELETE FROM gifts WHERE `id` = ?";
  } else {
    q = "DELETE FROM products WHERE `id` = ? ";
  }
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("item has been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

export const deleteColors = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM colors WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("colors have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

export const deleteSizes = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM sizes WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("sizes have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

export const deleteImages = async (req, res) => {
  if (req.query.type === "gifts") {
    return res.send("ok");
  }
  const q = "DELETE FROM images WHERE `productId` = ? ";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("images have been deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};
