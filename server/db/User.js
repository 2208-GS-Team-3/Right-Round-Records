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
    unique: true,
    validate: {
      notEmpty: true,
    },
    set(usernameInput) {
      this.setDataValue("username", usernameInput.toLowerCase());
    },
    get() {
      const username = this.getDataValue("username");
      const usernameArr = username.split("");
      usernameArr[0] = usernameArr[0].toUpperCase();
      return usernameArr.join("");
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
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
      return `${this.getDataValue("firstName")} ${this.getDataValue(
        "lastName"
      )}`;
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
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  address: {
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
    } else {
      const error = new Error("user not found");
      throw error;
    }
  } catch (ex) {
    console.log(ex);
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
