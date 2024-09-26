import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from pmdarima import auto_arima
import os
import warnings

warnings.filterwarnings("ignore")
print("라이브러리 임포트 완료")

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

# 데이터 로딩 함수 (변경 없음)
def load_data(base_path):
    all_data = []
    for year in range(1996, 2025):
        file_path = os.path.join(base_path, f"100_{year}_data.xlsx")
        try:
            data = pd.read_excel(file_path)
            data['price'] = data['price'].replace('-', np.nan)
            data['price'] = data['price'].str.replace(',', '').astype(float)
            data = data.dropna(subset=['price'])
            all_data.append(data)
            print(f"{year} 년도 데이터 로드 완료")
        except Exception as e:
            print(f"{year} 년도 데이터 로드 실패: {e}")
    return pd.concat(all_data)

# 데이터 로드
base_path = "C:/Users/SSAFY/Desktop/분석/시계열분석/축산제외 전체시계열데이터/"
combined_data = load_data(base_path)
print("전체 데이터 로드 완료")
combined_data['date'] = pd.to_datetime(combined_data['date'], errors='coerce')
rice_data = combined_data[combined_data['item_name'] == '감자'].set_index('date')['price']
print("쌀 데이터 추출 완료")

# 데이터 분할
train_data = rice_data[rice_data.index < '2024-01-01']
test_data = rice_data[rice_data.index >= '2024-01-01']
print("데이터 분할 완료")

# 최적의 SARIMA 파라미터 찾기 (수정됨)
print("SARIMA 파라미터 탐색 시작...")
try:
    model = auto_arima(train_data, seasonal=True, m=12,
                       start_p=1, start_q=1, max_p=3, max_q=3,
                       start_P=0, start_Q=0, max_P=2, max_Q=2,
                       d=1, D=1, trace=True, error_action='ignore', 
                       suppress_warnings=True, stepwise=True, n_jobs=-1)
    print("Best SARIMA params:", model.order, model.seasonal_order)
except Exception as e:
    print(f"SARIMA 파라미터 탐색 중 오류 발생: {e}")
    exit()

# SARIMA 모델 fitting
print("SARIMA 모델 fitting 시작...")
sarima_model = SARIMAX(train_data, order=model.order, seasonal_order=model.seasonal_order)
results = sarima_model.fit()
print("SARIMA 모델 fitting 완료")

# 예측
forecast = results.forecast(steps=len(test_data))
print("예측 완료")

# 평가 지표 계산
mse = mean_squared_error(test_data, forecast)
rmse = np.sqrt(mse)
mae = mean_absolute_error(test_data, forecast)
r2 = r2_score(test_data, forecast)

def calculate_mape(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    non_zero = y_true != 0
    return np.mean(np.abs((y_true[non_zero] - y_pred[non_zero]) / y_true[non_zero])) * 100

mape = calculate_mape(test_data, forecast)

# 결과 출력
print("\n===== 예측 모델 평가 지표 (SARIMA) =====")
print(f"테스트 데이터 길이: {len(test_data)}")
print(f"예측 데이터 길이: {len(forecast)}")
print(f"Mean Squared Error (MSE)           : {mse:.2f}")
print(f"Root Mean Squared Error (RMSE)     : {rmse:.2f}")
print(f"Mean Absolute Error (MAE)          : {mae:.2f}")
print(f"R-squared (R2) Score               : {r2:.4f}")
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
print("=========================================")

# 시각화
plt.figure(figsize=(12, 6))
plt.plot(train_data.index, train_data, label='Historical Price (Until 2023)')
plt.plot(test_data.index, test_data, label='Actual Price (2024)')
plt.plot(test_data.index, forecast, label='Forecasted Price', linestyle='--')
plt.title('쌀 가격: 2024년 예측 vs 실제 (SARIMA)')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 실제 값과 예측 값의 차이 분석
plt.figure(figsize=(12, 6))
plt.plot(test_data.index, test_data - forecast, color='purple')
plt.title('2024년 쌀 가격: 실제 값과 예측 값의 차이 (SARIMA)')
plt.xlabel('Date')
plt.ylabel('Price Difference (Actual - Predicted)')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

print("모든 과정 완료")

# 쌀
# ===== 예측 모델 평가 지표 (SARIMA) =====
# 테스트 데이터 길이: 180
# 예측 데이터 길이: 180
# Mean Squared Error (MSE)           : 38545.30
# Root Mean Squared Error (RMSE)     : 196.33
# Mean Absolute Error (MAE)          : 168.26
# R-squared (R2) Score               : -1.6890
# Mean Absolute Percentage Error (MAPE): 6.57%
# =========================================

# 감자
# ===== 예측 모델 평가 지표 (SARIMA) =====
# 테스트 데이터 길이: 177
# 예측 데이터 길이: 177
# Mean Squared Error (MSE)           : 4637878.37
# Root Mean Squared Error (RMSE)     : 2153.57
# Mean Absolute Error (MAE)          : 1769.16
# R-squared (R2) Score               : -10.6430
# Mean Absolute Percentage Error (MAPE): 54.76%
# =========================================