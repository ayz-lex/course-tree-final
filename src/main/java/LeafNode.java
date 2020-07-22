import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class LeafNode {
	private String val;

	public LeafNode(String val) {
		this.val = val;
	}
	
	public JSONArray JSONify() {
		JSONArray arr = new JSONArray();
		arr.add(this.val);
		return arr;
	}
	
}
