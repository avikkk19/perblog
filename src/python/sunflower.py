import math
import time
from colorama import Fore, Back, Style, init # type: ignore

# Initialize colorama
init(autoreset=True) 

def draw_sunflower():
    rows, cols = 40, 80  # Terminal dimensions
    center_x, center_y = cols // 2, rows // 3

    for y in range(rows):
        for x in range(cols):
            # Convert to polar coordinates
            dx = x - center_x
            dy = y - center_y
            r = math.sqrt(dx**2 + dy**2)
            angle = math.atan2(dy, dx)

            # Petals using sine wave pattern
            petals = math.sin(10 * angle) * (r / 8)

            # Define different parts
            if 5 < r < 15 and abs(petals) > 0.5:
                print(Fore.YELLOW + "*", end="")  # Petals
            elif r <= 5:
                print(Fore.RED + "O", end="")  # Sunflower center
            elif abs(dx) < 1 and dy > 10:
                print(Fore.GREEN + "|", end="")  # Stem
            else:
                print(" ", end="")  # Empty space
        print()

# Draw the sunflower
draw_sunflower()
