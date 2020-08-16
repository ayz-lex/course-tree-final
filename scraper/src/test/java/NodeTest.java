import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

class NodeTest {

	@Test
	void testInternalNode() {
		InternalNode node = new InternalNode("or");
		node.addLeaf(new LeafNode("hello"));
		node.addLeaf(new LeafNode("goodbye"));
	}
	
	@Test
	void testLeafNode() {
		LeafNode node = new LeafNode("hello");
		JSONObject obj = node.JSONify();
		JSONObject obj2 = new JSONObject();
		obj2.put("val", "hello");
		obj2.put("type", "leaf");
		assertEquals(obj, obj2);
	}

}
