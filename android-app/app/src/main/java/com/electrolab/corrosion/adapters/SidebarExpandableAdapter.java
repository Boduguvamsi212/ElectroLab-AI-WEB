package com.electrolab.corrosion.adapters;

import android.content.Context;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

import com.electrolab.corrosion.R;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class SidebarExpandableAdapter extends BaseExpandableListAdapter {
    private final Context context;
    private final List<String> groupHeaders;
    private final LinkedHashMap<String, List<String>> childItems;
    private int activeGroupPos = -1;
    private int activeChildPos = -1;

    public SidebarExpandableAdapter(Context context, List<String> groupHeaders,
                                     LinkedHashMap<String, List<String>> childItems) {
        this.context = context;
        this.groupHeaders = groupHeaders;
        this.childItems = childItems;
    }

    public void setActiveItem(int groupPos, int childPos) {
        activeGroupPos = groupPos;
        activeChildPos = childPos;
        notifyDataSetChanged();
    }

    @Override
    public int getGroupCount() { return groupHeaders.size(); }

    @Override
    public int getChildrenCount(int groupPosition) {
        return childItems.get(groupHeaders.get(groupPosition)).size();
    }

    @Override
    public Object getGroup(int groupPosition) { return groupHeaders.get(groupPosition); }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        return childItems.get(groupHeaders.get(groupPosition)).get(childPosition);
    }

    @Override
    public long getGroupId(int groupPosition) { return groupPosition; }

    @Override
    public long getChildId(int groupPosition, int childPosition) { return childPosition; }

    @Override
    public boolean hasStableIds() { return false; }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.nav_drawer_group, parent, false);
        }
        TextView tvTitle = convertView.findViewById(R.id.tv_group_title);
        TextView tvArrow = convertView.findViewById(R.id.tv_group_arrow);
        tvTitle.setText((String) getGroup(groupPosition));
        tvArrow.setText(isExpanded ? "▲" : "▼");
        return convertView;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild,
                              View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.nav_drawer_child, parent, false);
        }
        TextView tvTitle = convertView.findViewById(R.id.tv_child_title);
        View activeIndicator = convertView.findViewById(R.id.active_indicator);

        String title = (String) getChild(groupPosition, childPosition);
        tvTitle.setText(title);

        boolean isActive = (groupPosition == activeGroupPos && childPosition == activeChildPos);
        if (isActive) {
            tvTitle.setTextColor(context.getResources().getColor(R.color.colorCyan, null));
            tvTitle.setTypeface(null, Typeface.BOLD);
            activeIndicator.setVisibility(View.VISIBLE);
            convertView.setBackgroundColor(0x10_06_B6_D4);
        } else {
            tvTitle.setTextColor(context.getResources().getColor(R.color.colorTextSecondary, null));
            tvTitle.setTypeface(null, Typeface.NORMAL);
            activeIndicator.setVisibility(View.INVISIBLE);
            convertView.setBackgroundColor(0x00_00_00_00);
        }
        return convertView;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) { return true; }
}
