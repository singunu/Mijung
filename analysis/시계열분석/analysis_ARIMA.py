import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# 한글 폰트 설정
font_path = "C:/Windows/Fonts/malgun.ttf"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)
plt.rcParams['axes.unicode_minus'] = False

# 데이터 로딩
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

# 2023년까지의 데이터와 2024년 데이터 분리
train_data = combined_data[combined_data.index < '2024-01-01']
test_data = combined_data[combined_data.index >= '2024-01-01']

# ARIMA 모델 학습 (2023년까지의 데이터로)
model = ARIMA(train_data['price'], order=(5, 1, 2))
fitted_model = model.fit()

# 2024년 전체에 대한 예측
forecast = fitted_model.forecast(steps=len(test_data))

# 예측 결과와 실제 데이터 비교 시각화
plt.figure(figsize=(12, 6))
plt.plot(train_data.index, train_data['price'], label='Historical Price (Until 2023)', color='blue')
plt.plot(test_data.index, test_data['price'], label='Actual Price (2024)', color='green')
plt.plot(test_data.index, forecast, label='Forecasted Price (2024)', color='red', linestyle='--')
plt.title('감자 가격: 2024년 예측 vs 실제 (ARIMA)')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 평가 지표 계산 및 출력 부분
print("\n===== 예측 모델 평가 지표 (ARIMA) =====")

print(f"테스트 데이터 길이: {len(test_data)}")
print(f"예측 데이터 길이: {len(forecast)}")

# 데이터 타입 확인
print(f"테스트 데이터 타입: {type(test_data['price'])}")
print(f"예측 데이터 타입: {type(forecast)}")

# 평가 지표 계산
mse = mean_squared_error(test_data['price'], forecast)
rmse = np.sqrt(mse)
mae = mean_absolute_error(test_data['price'], forecast)
r2 = r2_score(test_data['price'], forecast)

print(f"Mean Squared Error (MSE)           : {mse:.2f}")
print(f"Root Mean Squared Error (RMSE)     : {rmse:.2f}")
print(f"Mean Absolute Error (MAE)          : {mae:.2f}")
print(f"R-squared (R2) Score               : {r2:.4f}")

# MAPE (Mean Absolute Percentage Error) 계산 수정
def calculate_mape(actual, predicted):
    mask = actual != 0
    return np.mean(np.abs((actual[mask] - predicted[mask]) / actual[mask])) * 100

mape = calculate_mape(test_data['price'].values, forecast.values)
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
print("=========================================")

# 실제 값과 예측 값의 차이 분석
plt.figure(figsize=(12, 6))
plt.plot(test_data.index, test_data['price'] - forecast, color='purple')
plt.title('2024년 감자 가격: 실제 값과 예측 값의 차이 (ARIMA)')
plt.xlabel('Date')
plt.ylabel('Price Difference (Actual - Predicted)')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()


# ===== 예측 모델 평가 지표 (ARIMA) =====
# 테스트 데이터 길이: 180
# 예측 데이터 길이: 180
# Mean Squared Error (MSE)           : 65849.05
# Root Mean Squared Error (RMSE)     : 256.61
# Mean Absolute Error (MAE)          : 226.86
# R-squared (R2) Score               : -3.5937
# Mean Absolute Percentage Error (MAPE): 8.83%
# =========================================