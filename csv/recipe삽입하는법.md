### csv 파일 삽입하는법
1. terminal을 활용해 mysql 로그인
2. db schema 컬럼 위치 조절(csv 순서와 sql 컬럼 순서를 맞춰놔야 됨)
    (recipe_id,name,hit,scrap_count,kind,inbun,level,cooking_time,image)
* 컬럼 위치를 조절하는 이유는 삽입되는 ,으로 짜르고 삽입되는 순서로 들어가기 때문임. 
3. 다음 명령어 삽입, 
```mysql
LOAD DATA LOCAL INFILE '{저장 경로}/reciperecipeCSV.csv'
INTO TABLE recipe
CHARACTER SET utf8
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(recipe_id,name,hit,scrap_count,kind,inbun,level,cooking_time,image);
```

참조자료 https://k-wien1589.tistory.com/68


### sql 참조
* 저는 컬럼 순서를 이렇게 바꿨는데, 팀원분들은 컬럼 순서가 어떻게 되는지 몰라서 참조해서 수정하시면 됩니다.
```sql
alter table recipe modify name TEXT after recipe_id;
alter table recipe modify hit Integer after name;

alter table recipe modify kind enum('BREAD','DESSERT','FUSION','KIMCHI_PICKLES_SAUCES','MAIN_DISH','NOODLES_DUMPLINGS','OTHER','RICE_PORRIDGE_RICE_CAKE','SALAD','SEASONING_SAUCE_JAM','SIDE_DISH','SNACK','SOUP','SOUP_STEW','STEW','TEA_BEVERAGE_ALCOHOL','WESTERN') after scrap_count;

alter table recipe modify inbun enum('FIVE','FOUR','ONE','SIX_OR_MORE','THREE','TWO') after kind

alter table recipe modify level enum('ADVANCED','ANYONE','BEGINNER','INTERMEDIATE','MASTER') after inbun;

alter table recipe modify cooking_time enum('MORE_THAN_2_HOURS','WITHIN_10_MINUTES','WITHIN_15_MINUTES','WITHIN_20_MINUTES','WITHIN_2_HOURS','WITHIN_30_MINUTES','WITHIN_5_MINUTES','WITHIN_60_MINUTES','WITHIN_90_MINUTES') after level;

alter table recipe modify image varchar(255) after cooking_time;
```

### 9월 25일 상황
* cow.csv는 끝남
* vegetable.json은 문제를 발견해서 내일 파싱을 다시해야됨.
* * 다음과 같이 쓰면 kindcode이 없이도 모든 정보를 알 수 있다. p_itemcode만 있으면 알 수 있다..
```text
http://www.kamis.or.kr/service/price/xml.do?action=periodEcoPriceList&p_productclscode=01&p_regday=2024-09-24&p_itemcategorycode=100&p_itemcode=141&p_convert_kg_yn=Y&p_cert_key=111&p_cert_id=222&p_returntype=xml

```

### 9월 26일 상황
* cow와 vegetable을 활용해 재료 테이블을 만들고 있습니다. 내일 오전까지 다 임포트 하겠습니다.