module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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

  Resource.associate = (models) => {
    Resource.belongsTo(models.User);
  };

  return Resource;
};
