#!/bin/bash
# Atualize o repositório do sistema 
sudo apt-get update

# Instale o MySQL Server
sudo apt-get install mysql-server -y

# Inicie e habilite o MySQL Server
sudo systemctl start mysql
sudo systemctl enable mysql

# Configure o MySQL Server
sudo mysql_secure_installation

# Acesse o MySQL
sudo mysql -u root
```

```sql
CREATE USER 'buzato'@'localhost' IDENTIFIED BY 'Buzato42';
GRANT ALL PRIVILEGES ON *.* TO 'buzato'@'localhost';
FLUSH PRIVILEGES;
exit;
```