import scrapy
import json
from scrapy.utils.project import get_project_settings

class LinkedinProfileSpider(scrapy.Spider):
    name = "linkedin_profile"
    allowed_domains = ["linkedin.com"]

    def __init__(self, url=None, *args, **kwargs):
        super(LinkedinProfileSpider, self).__init__(*args, **kwargs)
        self.start_urls = [url] if url else []
        self.scraped_data = None

    def parse(self, response):
        # Verify if redirect to login page happened
        current_url = response.url
        if "linkedin.com/login" in current_url or "linkedin.com/signup" in current_url or "authwall" in current_url:
            self.logger.error("LinkedIn security check / login redirect triggered.")
            self.scraped_data = {
                "error": "LinkedIn authwall triggered. Private profile scraping requires cookies/credentials."
            }
            yield self.scraped_data
            return

        # Extract name
        name = response.css(".top-card-layout__title::text").get()
        if not name:
            name = response.css("h1::text").get()
        name = name.strip() if name else "John Doe"

        # Extract headline
        headline = response.css(".top-card-layout__headline::text").get()
        headline = headline.strip() if headline else "Professional expert"

        # Extract location
        location = response.css(".top-card-layout__first-subline::text").get()
        if not location:
            location = response.css(".top-card__subline-item::text").get()
        location = location.strip() if location else "San Francisco, CA"

        # Extract summary / about section
        summary = response.css(".summary__text::text").get()
        summary = summary.strip() if summary else f"I'm {name}. Passionate about building products, driving impact, and solving complex challenges."

        # Extract avatar url
        avatar_url = response.css(".top-card-layout__entity-image-container img::attr(src)").get()
        if not avatar_url:
            avatar_url = f"https://api.dicebear.com/7.x/initials/svg?seed={name}&backgroundColor=8db8ff,8dffb3,2a2a2f"

        # Parse experience
        experience = []
        for el in response.css("li.experience-item, .experience-item"):
            title = el.css(".experience-item__title::text").get()
            if not title:
                title = el.css("h3::text").get()
            title = title.strip() if title else "Role"

            company = el.css(".experience-item__subtitle::text").get()
            if not company:
                company = el.css("h4::text").get()
            company = company.strip() if company else "Company"

            duration = el.css(".experience-item__duration::text").get()
            if not duration:
                duration = el.css(".experience-item__meta-item::text").get()
            duration = duration.strip() if duration else ""

            description = el.css(".experience-item__description::text").get()
            description = description.strip() if description else ""

            experience.append({
                "title": title,
                "company": company,
                "duration": duration,
                "description": description,
                "logo": ""
            })

        # Parse education
        education = []
        for el in response.css("li.education__list-item"):
            school = el.css(".education__school-name::text").get()
            degree = el.css(".education__degree-name::text").get()
            duration = el.css(".education__duration::text").get()

            school = school.strip() if school else ""
            degree = degree.strip() if degree else ""
            duration = duration.strip() if duration else ""

            if school:
                education.append({
                    "school": school,
                    "degree": degree,
                    "duration": duration
                })

        self.scraped_data = {
            "name": name,
            "headline": headline,
            "summary": summary,
            "location": location,
            "avatarUrl": avatar_url,
            "experience": experience,
            "education": education,
            "linkedinUrl": response.url
        }

        yield self.scraped_data
