# Server side of the Questionnaire-Generator

To run this server locally, you need to configure .env file with the following variables: (We use PostgreSQL as a database and S3 as a store for files)
```
DB_USER={db_user_name}
DB_PASSWORD={db_user_password}
DB_HOST={db_host}
DB_PORT={db_port}
DB_DATABASE={db_database}
S3_ACCESS_KEY_ID={access_key_id_for_s3}
S3_SECRET_KEY={secret_key_for_s3}
```
After that, run
```npm run dev```
