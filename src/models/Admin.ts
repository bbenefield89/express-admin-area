import Sequelize from 'sequelize'

export const Admin = db => {
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
      ]
    }
  )

  return adminModel
}
