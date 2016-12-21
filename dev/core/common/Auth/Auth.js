/**
 * Created by Jess on 21-Jun-16.
 */
app.factory("Auth",
    ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]);