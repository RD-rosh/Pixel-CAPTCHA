from flask import Flask, request, jsonify, render_template
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/validate', methods = ['POST'])
def validate():
    data = request.json
    text = data.get('text','')
    sentiment_scores = analyzer.polarity_scores(text)
    is_sad = sentiment_scores['compound'] <= -0.05
    return jsonify({"sad":is_sad})

if __name__ == '__main__':
    app.run(debug = True)