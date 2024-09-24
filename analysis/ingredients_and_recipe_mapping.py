import pandas as pd
import re

# 파일 경로 설정
grouped_file_path = "C:/Users/SSAFY/Desktop/분석/데이터전처리/완료/grouped_by_names_output.xlsx"
final_csv_path = "C:/Users/SSAFY/Desktop/분석/데이터전처리/완료/merged_output (1).csv"

# 파일 불러오기
grouped_df = pd.read_excel(grouped_file_path)
final_df = pd.read_csv(final_csv_path, encoding='cp949')  # CSV 파일을 읽을 때는 read_csv 사용

# grouped_by_names_output.xlsx에서 Numbers from href을 작은 숫자로 대표
def get_min_number(numbers_str):
    numbers = re.findall(r'\d+', str(numbers_str))  # 숫자만 추출
    numbers = list(map(int, numbers))  # 문자열을 정수형으로 변환
    return min(numbers) if numbers else None  # 가장 작은 숫자 반환

# 대표 숫자 딕셔너리 생성
grouped_df['Representative Number'] = grouped_df['Numbers from href'].apply(get_min_number)
number_mapping = {}

for idx, row in grouped_df.iterrows():
    numbers = re.findall(r'\d+', str(row['Numbers from href']))
    for num in numbers:
        number_mapping[num] = str(row['Representative Number'])  # 숫자를 대표 숫자로 매핑

# output - 최종태.csv 파일의 Numbers from href 변경
def replace_with_representative(numbers_str):
    if pd.isna(numbers_str):  # NaN일 경우 빈 문자열로 처리
        return numbers_str
    numbers = re.findall(r'\d+', str(numbers_str))  # 숫자만 추출
    new_numbers = [number_mapping.get(num, num) for num in numbers]  # 대표 숫자로 변경
    return '[' + ', '.join(new_numbers) + ']'

# 최종 데이터 변환
final_df['Numbers from href'] = final_df['Numbers from href'].apply(replace_with_representative)

# 새로운 파일로 저장
output_file_path = 'C:/Users/SSAFY/Desktop/분석/데이터전처리/final_modified_output.xlsx'
final_df.to_excel(output_file_path, index=False)

print(f"파일이 저장되었습니다: {output_file_path}")
