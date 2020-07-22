import java.io.IOException;
import java.util.Stack;
import java.io.FileWriter;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class parser {

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		// get document from url
		String URL = "https://ga.rice.edu/programs-study/departments-programs/engineering/computer-science/#coursestext";
		
		Document doc = Jsoup.connect(URL).get();
		
		Elements blocks = doc.getElementsByClass("courseblock");
		
		// setup JSONArray
		JSONArray classes = new JSONArray();
		
		for (Element block: blocks) {
			
			// get class code (e.g. COMP 382)
			// unparsedTitle = class code + class title
			// title = class code
			Elements unparsedTitle = block.select("p.courseblocktitle");
			
			String unparsedText = unparsedTitle.text().trim();
			
			String title = "";
			
			int j = 0;
			
			for (int i = 0; i < unparsedText.length(); i++) {
				if (unparsedText.charAt(i) == ' ') {
					j++;
					if (j == 2) {
						title = unparsedText.substring(0, i);
						break;
					}
				}
			}
						
			// get prerequisite class codes (e.g. COMP 182 or COMP 140)
			// prereqString = prereqs
			
			// Prerequisite(s):
			Element parse = block.selectFirst("strong:contains(Prerequisite(s):)");
			
			String prereqString = "";
			
			if (parse != null) {
				String prereqText = parse.parent().text().trim();
				for (int i = 0; i < prereqText.length(); i++) {
					if (prereqText.charAt(i) == ' ') {
						prereqString = prereqText.substring(i + 1);
						break;
					}
				}
			} 
			
			// parse string, and figure out and/or/parentheses stuff
			
			//build a tree first, and then figure out everything else
			
			
		}
		
		try (FileWriter file = new FileWriter("classes.json")) {
			file.write(classes.toJSONString());
			file.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
