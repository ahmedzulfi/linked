import sys
import os
import json
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

# Add project root to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from linkedin_scraper.spiders.linkedin_profile import LinkedinProfileSpider

def scrape(url):
    settings = get_project_settings()
    # Configure JSON export format to stdout or temp file
    settings.set('FEED_FORMAT', 'json')
    settings.set('LOG_LEVEL', 'INFO')
    
    # We want to capture the items inside a list
    results = []
    
    class CapturePipeline:
        def process_item(self, item, spider):
            results.append(item)
            return item
            
    # Dynamically attach pipeline to capture results in-memory
    settings.set('ITEM_PIPELINES', {
        CapturePipeline: 300
    })

    process = CrawlerProcess(settings)
    process.crawl(LinkedinProfileSpider, url=url)
    process.start() # blocks until crawl completes
    
    return results[0] if results else {"error": "No data scraped"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "LinkedIn URL parameter required"}))
        sys.exit(1)
        
    url = sys.argv[1]
    data = scrape(url)
    print(json.dumps(data))
