# sqlpage-migrate
Simplifies the process of creating migrations for sqlpage. When migration numbers get out of hand, this tool simplies the process by creating migrations files just by using the command line. This is similar to other tools that include database migration processes.

# usage
* Install with npm install -g sqlpage-migrate
* from the command line, at the root of your sqlpage project, execute sqlpage-migrate create [migration_name]
* this will create a file in the sqlpage/migrations folder that is automatically enumerated with the current date and time, and the name of your migration.

# example

#> sqlpage-migrate create test_migration
Created migration: sqlpage\migrations\20250506202808_test_migration.sql

