import java.util.ArrayList;

public class InternalNode {
	private int type;
	private ArrayList<LeafNode> leaves;
	private ArrayList<InternalNode> internals;

	public InternalNode(int type) {
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
	
	public void JSONify
	
}
