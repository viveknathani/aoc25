#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file = fopen("data/1.txt", "r");
    if (!file) {
        perror("file");
        return 1;
    }

    char buffer[32];
    int cur = 50;
    long long num_zeroes = 0;

    while (fgets(buffer, sizeof(buffer), file)) {
        char direction;
        int clicks;

        sscanf(buffer, "%c%d", &direction, &clicks);

        int negative = (direction == 'L');
        int prev = cur;

        int num_complete_revolutions = clicks / 100;
        int remainder = clicks % 100;

        num_zeroes += num_complete_revolutions;

        if (negative) {
            cur = cur - remainder;

            // crosses zero?
            if (cur <= 0) {
                cur += 100;
                if (prev > 0)
                    num_zeroes += 1;
            }
        } else {
            cur = cur + remainder;

            // crosses zero?
            if (cur >= 100) {
                cur -= 100;
                if (prev < 100)
                    num_zeroes += 1;
            }
        }
    }

    printf("%lld\n", num_zeroes);
    return 0;
}
