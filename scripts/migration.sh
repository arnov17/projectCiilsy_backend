 
argument="$1"

if [ $1 ]
then
cat > ./db/migrations/$(date +"%Y%m%d%H%M%S")-$1.js << EOF

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Write migration code here.
  },
  down: async (queryInterface, Sequelize) => {
    // If migration fails, this will be called. Rollback your migration changes.
  }
}
EOF
else
	printf "\033[1;31mNo specified migrations name \e[3m$2\e[0m\n"
fi 