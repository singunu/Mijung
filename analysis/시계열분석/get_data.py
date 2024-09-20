import requests
import pandas as pd
from datetime import datetime, timedelta

# 파일 로드
df = pd.read_excel("C:/Users/SSAFY/Desktop/분석/시계열분석/품목,품종,등급.xlsx")
print(df.columns)  # 열 이름 확인

# 농축수산물 품목 및 등급 코드표 엑셀 파일 로드
df_codes = pd.read_excel("C:/Users/SSAFY/Desktop/분석/시계열분석/Agricultural and livestock products and grade code table.xlsx")
print(df_codes.columns)  # 열 이름 확인

# API 정보 설정
api_key = 'd1101c1f-578b-4e60-a787-4b5dc49a63b0'
api_id = '4781'
base_url = "http://www.kamis.or.kr/service/price/xml.do"

# 날짜 설정 (오늘로부터 두 달 전)
end_date = datetime.today()
start_date = end_date - timedelta(days=60)
start_date = start_date.strftime('%Y-%m-%d')
end_date = end_date.strftime('%Y-%m-%d')

# 품목 코드와 소매 등급 코드 추출
valid_ranks = {row['itemcode']: str(row['retail_productrankcode']) for index, row in df_codes.iterrows() if pd.notna(row['retail_productrankcode'])}

# API 호출 및 CSV 저장
for index, row in df.iterrows():
    item_category_code = row['품목 그룹코드']
    item_code = row['품목 코드']
    kind_code = row['품종코드']
    item_name = row['품목명']
    kind_name = row['품종명']
    retail_ranks = valid_ranks.get(item_code, '').split(',')

    for rank_code in retail_ranks:
        rank_code = rank_code.strip()
        if rank_code:  # 유효한 등급 코드 사용
            print(f"Processing {item_name} {kind_name}, Rank: {rank_code}...")
            url = f"{base_url}?action=periodProductList&p_cert_key={api_key}&p_cert_id={api_id}&p_returntype=json"
            url += f"&p_startday={start_date}&p_endday={end_date}"
            url += f"&p_productclscode=01&p_itemcategorycode={item_category_code}&p_itemcode={item_code}&p_kindcode={kind_code}&p_productrankcode={rank_code}"
            url += "&p_countrycode=1101&p_convert_kg_yn=N"

            print("Request URL:", url)  # URL 로그 출력
            
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json().get('data')
                print("Data fetched, processing...")
                if data and 'item' in data:
                    df_data = pd.DataFrame(data['item'])
                    df_filtered = df_data[df_data['countyname'] == '평균']
                    if not df_filtered.empty:
                        csv_filename = f"{item_name}_{kind_name}_Rank_{rank_code}.csv"
                        df_filtered.to_csv(csv_filename, index=False, encoding='utf-8-sig')
                        print(f"Data saved to {csv_filename}")
                    else:
                        print("No average data in response.")
                else:
                    print("No item data received.")
            else:
                print(f"Failed with status code {response.status_code}, Response: {response.text}")

print("All data processing complete.")

