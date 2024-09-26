import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
from prophet import Prophet
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score


# 한글 폰트 설정
font_path = "C:/Windows/Fonts/malgun.ttf"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)
plt.rcParams['axes.unicode_minus'] = False

# 데이터 로딩 (변경 없음)
all_data = []
base_path = "C:/Users/SSAFY/Desktop/분석/시계열분석/축산제외 전체시계열데이터/"

for year in range(1996, 2025):
    file_path = os.path.join(base_path, f"100_{year}_data.xlsx")
    data = pd.read_excel(file_path)
    
    # 데이터 클린업
    data['price'] = data['price'].replace('-', np.nan)
    data['price'] = data['price'].str.replace(',', '').astype(float)
    data = data.dropna(subset=['price'])
    
    all_data.append(data)

# 결합된 데이터 프레임 생성
combined_data = pd.concat(all_data)
combined_data['date'] = pd.to_datetime(combined_data['date'], errors='coerce')
combined_data = combined_data[combined_data['item_name'] == '감자']
combined_data.set_index('date', inplace=True)

# Prophet 데이터 형식으로 변경
prophet_data = combined_data.reset_index().rename(columns={'date': 'ds', 'price': 'y'})

# 2023년까지의 데이터와 2024년 데이터 분리
train_data = prophet_data[prophet_data['ds'] < '2024-01-01']
test_data = prophet_data[prophet_data['ds'] >= '2024-01-01']

# Prophet 모델 학습 (2023년까지의 데이터로만)
model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
model.fit(train_data)

# 2024년 전체에 대한 예측
future_dates = test_data['ds']
forecast = model.predict(pd.DataFrame({'ds': future_dates}))

# 예측 결과와 실제 데이터 비교 시각화
plt.figure(figsize=(12, 6))
plt.plot(train_data['ds'], train_data['y'], label='Historical Price (Until 2023)', color='blue')
plt.plot(test_data['ds'], test_data['y'], label='Actual Price (2024)', color='green')
plt.plot(forecast['ds'], forecast['yhat'], label='Forecasted Price', color='red', linestyle='--')
plt.fill_between(forecast['ds'], forecast['yhat_lower'], forecast['yhat_upper'], color='red', alpha=0.2)
plt.title('쌀 가격: 2024년 예측 vs 실제 (Prophet)')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 2024년 예측 결과 추출
forecast_2024 = forecast[forecast['ds'] >= '2024-01-01']['yhat']

# 평가 지표 계산 및 출력 부분
print("\n===== 예측 모델 평가 지표 (Prophet) =====")

# 데이터 길이 확인
print(f"테스트 데이터 길이: {len(test_data)}")
print(f"예측 데이터 길이: {len(forecast_2024)}")

# 데이터 타입 확인
print(f"테스트 데이터 타입: {type(test_data['y'])}")
print(f"예측 데이터 타입: {type(forecast_2024)}")

# 평가 지표 계산

mse = mean_squared_error(test_data['y'], forecast['yhat'])
rmse = np.sqrt(mse)
mae = mean_absolute_error(test_data['y'], forecast['yhat'])
r2 = r2_score(test_data['y'], forecast['yhat'])

print("\n===== 예측 모델 평가 지표 (Prophet) =====")
print(f"테스트 데이터 길이: {len(test_data)}")
print(f"예측 데이터 길이: {len(forecast)}")
print(f"Mean Squared Error (MSE)           : {mse:.2f}")
print(f"Root Mean Squared Error (RMSE)     : {rmse:.2f}")
print(f"Mean Absolute Error (MAE)          : {mae:.2f}")
print(f"R-squared (R2) Score               : {r2:.4f}")


# MAPE (Mean Absolute Percentage Error) 계산
def calculate_mape(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    non_zero = y_true != 0
    return np.mean(np.abs((y_true[non_zero] - y_pred[non_zero]) / y_true[non_zero])) * 100

mape = calculate_mape(test_data['y'], forecast['yhat'])
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
print("=========================================")

# 실제 값과 예측 값의 차이 분석
plt.figure(figsize=(12, 6))
plt.plot(test_data['ds'], test_data['y'] - forecast_2024, color='purple')
plt.title('2024년 쌀 가격: 실제 값과 예측 값의 차이 (Prophet)')
plt.xlabel('Date')
plt.ylabel('Price Difference (Actual - Predicted)')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 구성 요소 플롯
model.plot_components(forecast)
plt.show()

# 쌀
# ===== 예측 모델 평가 지표 (Prophet) =====
# 테스트 데이터 길이: 180
# 예측 데이터 길이: 180
# Mean Squared Error (MSE)           : 35896.40
# Root Mean Squared Error (RMSE)     : 189.46
# Mean Absolute Error (MAE)          : 156.48
# R-squared (R2) Score               : -1.5042
# Mean Absolute Percentage Error (MAPE): 6.13%
# =========================================

# 감자
# ===== 예측 모델 평가 지표 (Prophet) =====
# 테스트 데이터 길이: 177
# 예측 데이터 길이: 177
# Mean Squared Error (MSE)           : 1089669.56
# Root Mean Squared Error (RMSE)     : 1043.87
# Mean Absolute Error (MAE)          : 937.10
# R-squared (R2) Score               : -1.7355
# Mean Absolute Percentage Error (MAPE): 27.14%
# =========================================