import Sequelize from 'sequelize'

const Admin = db => {
  const adminModel = db.define(
    'admins',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          len: [1, 256]
        }
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 256]
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['username']
        }
      ],
      defaultScope: {
        attributes: { exclude: ['password'] }
      }
    }
  )

  return adminModel
}

export { Admin }