namespace SentimentApi.DTOs
{
    public class SentimentResponse
    {
        public string Sentiment { get; set; } = string.Empty;
        public double PositiveScore { get; set; }
        public double NeutralScore { get; set; }
        public double NegativeScore { get; set; }
    }
}
