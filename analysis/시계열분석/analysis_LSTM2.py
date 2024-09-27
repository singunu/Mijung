import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import Input

# 한글 폰트 설정
font_path = "C:/Windows/Fonts/malgun.ttf"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)
plt.rcParams['axes.unicode_minus'] = False

# 데이터 로딩 함수
def load_data(base_path, start_year, end_year, item_name):
    all_data = []
    for year in range(start_year, end_year + 1):
        file_path = os.path.join(base_path, f"100_{year}_data.xlsx")
        data = pd.read_excel(file_path)
        data['price'] = data['price'].replace('-', np.nan)
        data['price'] = data['price'].str.replace(',', '').astype(float)
        data = data.dropna(subset=['price'])
        all_data.append(data)
    combined_data = pd.concat(all_data)
    combined_data['date'] = pd.to_datetime(combined_data['date'], errors='coerce')
    combined_data = combined_data[combined_data['item_name'] == item_name]
    combined_data.set_index('date', inplace=True)
    return combined_data['price'].sort_index()

# 데이터 전처리 함수
def preprocess_data(data, look_back=60):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data.values.reshape(-1, 1))
    X, y = [], []
    for i in range(len(scaled_data) - look_back):
        X.append(scaled_data[i:(i + look_back), 0])
        y.append(scaled_data[i + look_back, 0])
    return np.array(X), np.array(y), scaler

# LSTM 모델 생성 함수
def create_model(look_back):
    model = Sequential([
        Input(shape=(look_back, 1)),  # 입력 모양 정의
        LSTM(50, activation='relu', return_sequences=True),
        LSTM(50, activation='relu'),
        Dense(1)
    ])
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')
    return model

# 메인 실행 코드
if __name__ == "__main__":
    base_path = "C:/Users/SSAFY/Desktop/분석/시계열분석/축산제외 전체시계열데이터/"
    item_name = '감자'
    price_data = load_data(base_path, 1996, 2024, item_name)
    train_data = price_data[price_data.index < '2024-01-01']
    test_data = price_data[price_data.index >= '2024-01-01']
    look_back = 60
    X, y, scaler = preprocess_data(train_data, look_back)
    model = create_model(look_back)
    model.fit(X, y, epochs=100, batch_size=32, validation_split=0.1, verbose=1)

    # 스케일링 확인
    print("Data range after scaling (min, max):", scaler.data_min_, scaler.data_max_)

    # 2024년 예측
    last_sequence = train_data[-look_back:].values.reshape(-1, 1)
    last_sequence_scaled = scaler.transform(last_sequence)
    X_test, predictions = [], []
    for i in range(len(test_data)):
        X_test.append(last_sequence_scaled)
        next_pred = model.predict(last_sequence_scaled.reshape(1, look_back, 1))
        predictions.append(next_pred)
        last_sequence = np.append(last_sequence[1:], scaler.inverse_transform(next_pred))
        last_sequence_scaled = scaler.transform(last_sequence.reshape(-1, 1))

    predictions = np.array(predictions).reshape(-1, 1)
    predictions = scaler.inverse_transform(predictions)

    # 예측값과 실제값 출력
    print("First 5 predictions:", predictions[:5])
    print("First 5 actual values:", test_data.values[:5])

    # 평가 지표 계산
    mse = mean_squared_error(test_data, predictions)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(test_data, predictions)
    r2 = r2_score(test_data, predictions)
    mape = np.mean(np.abs((test_data.values - predictions.flatten()) / test_data.values)) * 100

    # 결과 출력
    print("\n===== 예측 모델 평가 지표 (LSTM - 감자) =====")
    print("테스트 데이터 길이:", len(test_data))
    print("예측 데이터 길이:", len(predictions))
    print("Mean Squared Error (MSE): {:.2f}".format(mse))
    print("Root Mean Squared Error (RMSE): {:.2f}".format(rmse))
    print("Mean Absolute Error (MAE): {:.2f}".format(mae))
    print("R-squared (R2) Score: {:.4f}".format(r2))
    print("Mean Absolute Percentage Error (MAPE): {:.2f}%".format(mape))
    print("=========================================")

    # 그래프 그리기
    plt.figure(figsize=(12, 6))
    plt.plot(train_data.index, train_data, label='Historical Price (Until 2023)', color='blue')
    plt.plot(test_data.index, test_data, label='Actual Price (2024)', color='green')
    plt.plot(test_data.index, predictions, label='Predicted Price (2024)', color='red', linestyle='--')
    plt.title('감자 가격: 2024년 예측 vs 실제 (LSTM)')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

    # 실제 값과 예측 값의 차이 분석
    plt.figure(figsize=(12, 6))
    plt.plot(test_data.index, test_data.values - predictions.flatten(), color='purple')
    plt.title('2024년 감자 가격: 실제 값과 예측 값의 차이 (LSTM)')
    plt.xlabel('Date')
    plt.ylabel('Price Difference (Actual - Predicted)')
    plt.grid(True)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()


# ===== 예측 모델 평가 지표 (LSTM - 쌀) =====
# 테스트 데이터 길이: 180
# 예측 데이터 길이: 180
# Mean Squared Error (MSE): 20173.25
# Root Mean Squared Error (RMSE): 142.03
# Mean Absolute Error (MAE): 123.33
# R-squared (R2) Score: -0.4073
# Mean Absolute Percentage Error (MAPE): 4.74%
# =========================================

# ===== 예측 모델 평가 지표 (LSTM - 감자) =====
# 테스트 데이터 길이: 177
# 예측 데이터 길이: 177
# Mean Squared Error (MSE): 1288733.61
# Root Mean Squared Error (RMSE): 1135.22
# Mean Absolute Error (MAE): 928.49
# R-squared (R2) Score: -2.2353
# Mean Absolute Percentage Error (MAPE): 23.48%
# =========================================