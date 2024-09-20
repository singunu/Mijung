import pandas as pd
import ast
# 데이터 정제 및 빈 리스트/값 제거 스크립트

# CSV 파일 불러오기
df = pd.read_csv('C:/Users/SSAFY/Desktop/분석/merged_output.csv', encoding='utf-8', low_memory=False)

# 빈 리스트([]) 혹은 빈 값이 포함된 행을 제거하는 함수
def remove_empty_or_empty_list(row):
    try:
        # 'Numbers from href' 열에서 리스트가 빈 리스트인지 확인
        numbers_from_href = ast.literal_eval(row['Numbers from href'])
        if numbers_from_href == []:  # 실제 빈 리스트인지 확인
            return False  # 빈 리스트가 있으면 해당 행 삭제
    except (ValueError, SyntaxError):
        # 변환 오류 발생 시 무시하고 다음으로 진행
        if row['Numbers from href'] == '[]':
            return False  # 문자열 '[]'이면 해당 행 삭제
    
    # 빈 값이나 빈 리스트가 포함된 다른 열 확인
    for col in ['Ingre List Names', 'Ingre UL Indices', 'EA List']:
        try:
            val = ast.literal_eval(row[col])
        except (ValueError, SyntaxError):
            val = row[col]  # 변환 실패 시 원래 값을 사용
        
        if val == [] or val == '' or val == ['']:
            return False  # 빈 리스트 또는 빈 값이 있으면 해당 행 삭제
    
    return True

# 빈 리스트([])나 빈 값을 가진 행 제거
df = df[df.apply(remove_empty_or_empty_list, axis=1)]

# 'Numbers from href' 열에서 빈 값('')을 제거
def remove_empty_in_list(column):
    try:
        # 문자열로 저장된 리스트를 실제 리스트로 변환 후 빈 값 제거
        return [item for item in ast.literal_eval(column) if item != '']
    except (ValueError, SyntaxError):
        return column  # 변환 실패 시 원래 값을 반환

df['Numbers from href'] = df['Numbers from href'].apply(remove_empty_in_list)

# 정제된 데이터를 새로운 CSV 파일로 저장
df.to_csv('정제된_파일.csv', index=False, encoding='utf-8')

print("빈 값 및 빈 리스트가 제거된 CSV 파일이 저장되었습니다.")
