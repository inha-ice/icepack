module.exports = (sequelize, DataTypes) => {
  const Locker = sequelize.define('Locker', {
    id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    note: DataTypes.STRING(100),
    rentedAt: DataTypes.DATE,
    returnedAt: DataTypes.DATE,
  }, {
    timestamps: true,
    paranoid: true,
  });

  Locker.associate = (models) => {
    Locker.belongsTo(models.User);
  };

  return Locker;
};
