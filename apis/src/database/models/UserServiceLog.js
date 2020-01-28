module.exports = (sequelize, DataTypes) => {
  const UserServiceLog = sequelize.define('UserServiceLog', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    timestamps: true,
    updatedAt: false,
  });

  UserServiceLog.associate = (models) => {
    UserServiceLog.belongsTo(models.User, {
      foreignKey: { allowNull: false },
    });
  };

  return UserServiceLog;
};
