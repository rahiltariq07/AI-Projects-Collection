using Azure.AI.TextAnalytics;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SentimentApi.DTOs;

namespace SentimentApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SentimentController : ControllerBase
    {
        private readonly TextAnalyticsClient _client;

        public SentimentController()
        {
            // Hardcoded credentials
            string endpoint = "https://<your-resource-name>.cognitiveservices.azure.com/";
            string apiKey = "<your-key-here>";
            var credentials = new AzureKeyCredential(apiKey);

            _client = new TextAnalyticsClient(new Uri(endpoint), credentials);
        }

        [HttpPost("analyze")]
        public ActionResult<SentimentResponse> AnalyzeSentiment([FromBody] SentimentRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text cannot be empty");

            var documentSentiment = _client.AnalyzeSentiment(request.Text);

            return Ok(new SentimentResponse
            {
                Sentiment = documentSentiment.Value.Sentiment.ToString(),
                PositiveScore = documentSentiment.Value.ConfidenceScores.Positive,
                NeutralScore = documentSentiment.Value.ConfidenceScores.Neutral,
                NegativeScore = documentSentiment.Value.ConfidenceScores.Negative
            });
        }
    }
}
