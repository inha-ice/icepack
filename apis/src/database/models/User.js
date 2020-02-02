module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    paid: DataTypes.INTEGER,
    refunded: DataTypes.INTEGER,
    note: DataTypes.STRING(100),
    paidAt: DataTypes.DATE,
    refundedAt: DataTypes.DATE,
  }, {
    timestamps: true,
    paranoid: true,
  });
  return User;
};
