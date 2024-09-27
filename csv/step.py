import pandas as pd
import mysql.connector
from mysql.connector import Error
import numpy as np

mergedf = pd.read_csv("{경로}\\forupload.csv", encoding="utf8")

# MySQL 연결 매개변수
try:
    cnx = mysql.connector.connect(user='{db id}', password='{db pass}', host='localhost', database='mijung')
    cursor = cnx.cursor()
# DataFrame의 행을 반복하여 MySQL에 데이터 삽입
    for index, row in mergedf.iterrows():
        try:
            cursor.execute(
                "INSERT INTO step (step_id, recipe_id, content, image) VALUES (%s, %s, %s, %s)",
                (row['index'], row['recipe_id'], row['content'], row['url'])
            )
        except Error as e:
            print(f"Error inserting row {index}: {e}")

    # 변경 사항 커밋
    cnx.commit()

except Error as e:
    print(f"Error connecting to MySQL: {e}")
finally:
    # 커서 및 연결 종료
    if 'cursor' in locals():
        cursor.close()
    if 'cnx' in locals():
        cnx.close()