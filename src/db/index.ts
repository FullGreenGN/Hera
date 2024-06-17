import { Sequelize, DataTypes } from 'sequelize';

export async function connect() {
    try {
        await sequelize.authenticate();
        // create tables if they don't exist
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    lastLogin: DataTypes.DATE
});

const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    color: DataTypes.STRING
});

const Absent = sequelize.define('Absent', {
    name: DataTypes.DATE,
    reason: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
});

const Settings = sequelize.define('Settings', {
    slideTime: DataTypes.INTEGER,
    showAbsent: DataTypes.BOOLEAN,
    showPost: DataTypes.BOOLEAN,
});

export { User, Post, Absent, Settings }

export default sequelize
