import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class LeafNode {
	private String val;
	private String type;

	public LeafNode(String val) {
		this.type = "leaf";
		this.val = val;
	}
	
	public JSONObject JSONify() {
		JSONObject obj = new JSONObject();
		obj.put("val", this.val);
		obj.put("type", this.type);
		return obj;
	}
}
