package com.electrolab.corrosion.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.electrolab.corrosion.R;

public class StubFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_stub, container, false);
        TextView tvTitle = view.findViewById(R.id.tv_stub_title);
        if (getArguments() != null) {
            String title = getArguments().getString("title", "Feature");
            tvTitle.setText(title);
        }
        return view;
    }
}
