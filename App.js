<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Top Bar -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:padding="10dp"
        android:gravity="center_vertical">

        <TextView
            android:text="SocialStream"
            android:textSize="18sp"
            android:textStyle="bold"
            android:layout_weight="1"
            android:layout_width="0dp"
            android:layout_height="wrap_content"/>

        <ImageView
            android:src="@android:drawable/ic_menu_search"
            android:layout_width="24dp"
            android:layout_height="24dp"/>
    </LinearLayout>

    <!-- Stories -->
    <HorizontalScrollView
        android:layout_width="match_parent"
        android:layout_height="80dp">

        <LinearLayout
            android:orientation="horizontal"
            android:layout_width="wrap_content"
            android:layout_height="match_parent">

            <!-- Story Circle -->
            <View
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:background="@android:drawable/btn_radio"
                android:layout_margin="10dp"/>

            <View
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:background="@android:drawable/btn_radio"
                android:layout_margin="10dp"/>

            <View
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:background="@android:drawable/btn_radio"
                android:layout_margin="10dp"/>

        </LinearLayout>
    </HorizontalScrollView>

    <!-- Video Section -->
    <TextView
        android:text="20/30 min videos"
        android:textSize="16sp"
        android:padding="10dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

    <View
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:background="#CCCCCC"
        android:layout_margin="10dp"/>

    <!-- Bottom Navigation -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="60dp"
        android:orientation="horizontal"
        android:gravity="space_evenly"
        android:background="#EEEEEE">

        <ImageView
            android:src="@android:drawable/ic_menu_view"
            android:layout_width="30dp"
            android:layout_height="30dp"/>

        <ImageView
            android:src="@android:drawable/ic_media_play"
            android:layout_width="30dp"
            android:layout_height="30dp"/>

        <ImageView
            android:src="@android:drawable/ic_menu_send"
            android:layout_width="30dp"
            android:layout_height="30dp"/>

        <ImageView
            android:src="@android:drawable/ic_menu_search"
            android:layout_width="30dp"
            android:layout_height="30dp"/>

        <ImageView
            android:src="@android:drawable/ic_menu_myplaces"
            android:layout_width="30dp"
            android:layout_height="30dp"/>
    </LinearLayout>

</LinearLayout>
