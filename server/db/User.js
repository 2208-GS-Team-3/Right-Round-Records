const db = require("./db");
const { STRING, UUID, UUIDV4, VIRTUAL, DATE } = db.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BOOLEAN } = require("sequelize");
const JWT = process.env.JWT;

const User = db.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //new code starts here
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: VIRTUAL,
    validate: {
      notEmpty: true,
    },
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  creditCardNum: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
      isCreditCard: true,
    },
  },
  phoneNum: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    unique: true,
  },
  shippingAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  billingAddress: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  birthday: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
  },
  avatarUrl: {
    type: STRING,
    allowNull: true,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  //new code ends
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
