import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class InternalNode {
	private String type;
	private ArrayList<LeafNode> leaves;
	private ArrayList<InternalNode> internals;

	public InternalNode(String type) {
		this.type = type;
		this.leaves = new ArrayList<LeafNode>();
		this.internals = new ArrayList<InternalNode>();
	}
	
	public void addLeaf(LeafNode leaf) {
		this.leaves.add(leaf);
	}
	
	public void addInternal(InternalNode node) {
		this.internals.add(node);
	}
	
	public JSONObject JSONify() {
		JSONArray arr = new JSONArray();
		for (LeafNode leaf: this.leaves) {
			arr.add(leaf.JSONify());
		}
		for (InternalNode node: this.internals) {
			arr.add(node.JSONify());
		}
		JSONObject obj = new JSONObject();
		obj.put("val", arr);
		obj.put("type", this.type);
		return obj;
	}
}
