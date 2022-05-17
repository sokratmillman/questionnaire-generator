# Server side of the Questionnaire-Generator

You will need Yandex S3 bucket to store .csv files with a key and key id.

Moreover, you will need to create a Postgres database and store its credentials somewhere.

Then, to run this server locally, you need to configure server/.env file with the following variables:

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
