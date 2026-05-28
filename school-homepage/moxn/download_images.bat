@echo off
echo 正在从 Unsplash 下载图片...

echo 1. 下载学校介绍图片...
curl -o "public\images\about_intro.jpg" "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"

echo 2. 下载领导团队头像（4张）...
curl -o "public\images\team_leader_1.jpg" "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
curl -o "public\images\team_leader_2.jpg" "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
curl -o "public\images\team_leader_3.jpg" "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
curl -o "public\images\team_leader_4.jpg" "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"

echo 3. 下载教授师资头像（4张）...
curl -o "public\images\professor_1.jpg" "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
curl -o "public\images\professor_2.jpg" "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
curl -o "public\images\professor_3.jpg" "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
curl -o "public\images\professor_4.jpg" "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"

echo 4. 下载教学资源图片（4张）...
curl -o "public\images\resource_lab.jpg" "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
curl -o "public\images\resource_library.jpg" "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80"
curl -o "public\images\resource_online.jpg" "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80"
curl -o "public\images\resource_maker.jpg" "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"

echo 5. 下载地图背景图片...
curl -o "public\images\contact_map.jpg" "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"

echo.
echo 所有图片下载完成！
pause
