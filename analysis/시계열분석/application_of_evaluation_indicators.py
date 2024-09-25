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

# 데이터 로딩 (이전 코드에서 사용한 방식으로 데이터를 로드합니다)
# combined_data를 이용해 작업한다고 가정합니다
all_data = []

# 데이터 파일 경로
base_path = "C:/Users/SSAFY/Desktop/분석/시계열분석/축산제외 전체시계열데이터/"

# 1996년부터 2024년까지의 데이터를 불러와서 결합
for year in range(1996, 2025):
    file_path = os.path.join(base_path, f"100_{year}_data.xlsx")
    data = pd.read_excel(file_path)
    
    # 데이터 클린업
    data['price'] = data['price'].replace('-', np.nan)  # '-'를 NaN으로 변경
    data['price'] = data['price'].str.replace(',', '').astype(float)  # 콤마 제거 후 숫자형으로 변환
    data = data.dropna(subset=['price'])  # 가격 정보가 있는 데이터만 유지
    
    # 클린 데이터 추가
    all_data.append(data)

# 결합된 데이터 프레임 생성
combined_data = pd.concat(all_data)
combined_data['date'] = pd.to_datetime(combined_data['date'], errors='coerce')
combined_data = combined_data[combined_data['item_name'] == '쌀']
combined_data.set_index('date', inplace=True)

# 2023년까지의 데이터와 2024년 데이터 분리
train_data = combined_data[combined_data.index < '2024-01-01']
test_data = combined_data[combined_data.index >= '2024-01-01']

# ARIMA 모델 학습 (2023년까지의 데이터로)
model = ARIMA(train_data['price'], order=(5, 1, 2))
fitted_model = model.fit()

# 2024년 전체에 대한 예측
forecast_steps = len(test_data)
forecast = fitted_model.forecast(steps=forecast_steps)
forecast_index = test_data.index

# 예측 결과와 실제 데이터 비교 시각화
plt.figure(figsize=(12, 6))
plt.plot(train_data.index, train_data['price'], label='Historical Price (Until 2023)', color='blue')
plt.plot(test_data.index, test_data['price'], label='Actual Price (2024)', color='green')
plt.plot(forecast_index, forecast, label='Forecasted Price (2024)', color='red', linestyle='--')
plt.title('쌀 가격: 2024년 예측 vs 실제')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 평가 지표 계산
mse = mean_squared_error(test_data['price'], forecast)
rmse = np.sqrt(mse)
mae = mean_absolute_error(test_data['price'], forecast)
r2 = r2_score(test_data['price'], forecast)

print("\n예측 모델 평가 지표:")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"R-squared (R2) Score: {r2:.2f}")

# MAPE (Mean Absolute Percentage Error) 계산
mape = np.mean(np.abs((test_data['price'] - forecast) / test_data['price'])) * 100
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")

# 실제 값과 예측 값의 차이 분석
plt.figure(figsize=(12, 6))
plt.plot(test_data.index, test_data['price'] - forecast, color='purple')
plt.title('2024년 쌀 가격: 실제 값과 예측 값의 차이')
plt.xlabel('Date')
plt.ylabel('Price Difference (Actual - Predicted)')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()


# 결과
# Mean Squared Error (MSE): 65849.05

# MSE는 예측값과 실제값의 차이를 제곱한 평균입니다.
# 이 값이 크다는 것은 예측이 실제 값과 상당히 차이가 난다는 것을 의미합니다.


# Root Mean Squared Error (RMSE): 256.61

# RMSE는 MSE의 제곱근으로, 실제 데이터와 같은 단위로 해석할 수 있습니다.
# 쌀 가격의 단위가 원이라고 가정하면, 평균적으로 약 257원 정도 예측이 빗나간다고 볼 수 있습니다.


# Mean Absolute Error (MAE): 226.86

# MAE는 예측값과 실제값의 절대 차이의 평균입니다.
# 평균적으로 약 227원 정도 예측이 실제 값과 차이가 난다고 해석할 수 있습니다.


# R-squared (R2) Score: -3.59

# R2 점수는 모델이 데이터의 변동성을 얼마나 잘 설명하는지를 나타냅니다.
# 일반적으로 0에서 1 사이의 값을 가지며, 1에 가까울수록 좋은 모델입니다.
# 음수 값이 나왔다는 것은 모델의 예측이 단순히 평균값을 사용하는 것보다도 더 나쁜 성능을 보인다는 의미입니다.

# 다른 분석모델 검토 예정